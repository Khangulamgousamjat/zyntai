import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../lib/theme";

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_t;

vec2 hash2(vec2 p){
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i), f),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i = 0; i < 5; i++){
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  float t = u_t * 0.05;
  vec2 q = vec2(fbm(p * 1.35 + t), fbm(p * 1.35 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p * 1.35 + 3.2 * q + vec2(1.7, 9.2) + 0.32 * t),
    fbm(p * 1.35 + 3.2 * q + vec2(8.3, 2.8) - 0.24 * t));
  float f = fbm(p * 1.35 + 2.7 * r);
  float ink = smoothstep(0.42, 0.96, f);
  float streak = smoothstep(0.52, 0.9, fbm(p * 3.1 - r + t));
  vec3 amber = vec3(0.98, 0.66, 0.12);
  vec3 ember = vec3(0.88, 0.3, 0.06);
  vec3 col = mix(amber, ember, clamp(q.x * 0.5 + 0.5, 0.0, 1.0));
  vec2 c = uv - 0.5;
  float vig = smoothstep(0.9, 0.18, length(c));
  float alpha = (ink * 0.42 + streak * 0.1) * vig;
  gl_FragColor = vec4(col * alpha * 1.2, alpha * 0.5);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export default function FluidBg({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
    } catch {
      return;
    }
    if (!gl) return;
    const g = gl;

    const compile = (type: number, src: string) => {
      const s = g.createShader(type);
      if (!s) return null;
      g.shaderSource(s, src);
      g.compileShader(s);
      return g.getShaderParameter(s, g.COMPILE_STATUS) ? s : null;
    };

    const vs = compile(g.VERTEX_SHADER, VERT);
    const fs = compile(g.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = g.createProgram();
    if (!prog) return;
    g.attachShader(prog, vs);
    g.attachShader(prog, fs);
    g.linkProgram(prog);
    if (!g.getProgramParameter(prog, g.LINK_STATUS)) return;
    g.useProgram(prog);

    const buf = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
    const loc = g.getAttribLocation(prog, "a_pos");
    g.enableVertexAttribArray(loc);
    g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
    g.enable(g.BLEND);
    g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);

    const uRes = g.getUniformLocation(prog, "u_res");
    const uT = g.getUniformLocation(prog, "u_t");

    let raf = 0;
    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(2, Math.floor(rect.width * 0.5));
      h = Math.max(2, Math.floor(rect.height * 0.5));
      canvas.width = w;
      canvas.height = h;
      g.viewport(0, 0, w, h);
      g.uniform2f(uRes, w, h);
    };

    const frame = (t: number) => {
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT);
      g.uniform1f(uT, t);
      g.drawArrays(g.TRIANGLES, 0, 3);
    };

    resize();
    if (reduce) {
      frame(9.5); // one beautiful static frame
      const onResize = () => {
        resize();
        frame(9.5);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        g.deleteProgram(prog);
        g.deleteBuffer(buf);
        g.deleteShader(vs);
        g.deleteShader(fs);
      };
    }

    let isVisible = true;
    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    obs.observe(canvas);

    const start = performance.now();
    let lastFrame = 0;
    const loop = (now: number) => {
      if (isVisible && now - lastFrame >= 40) {
        frame((now - start) / 1000);
        lastFrame = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("resize", onResize);
      g.deleteProgram(prog);
      g.deleteBuffer(buf);
      g.deleteShader(vs);
      g.deleteShader(fs);
    };
  }, [reduce]);

  const light = theme === "light";
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${
        light ? "opacity-40" : "opacity-65"
      } ${className}`}
    />
  );
}
