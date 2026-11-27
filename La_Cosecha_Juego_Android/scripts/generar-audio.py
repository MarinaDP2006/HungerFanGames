#!/usr/bin/env python3
"""Música y ambientes ORIGINALES de La Cosecha, sintetizados por código (sin muestras ni audio de las películas).

Genera bucles OGG en assets/audio/ para el director de audio (js/audio.js).
  python3 scripts/generar-audio.py           # todos
Requiere numpy y ffmpeg. Determinista: la semilla fija da siempre el mismo resultado.
"""
import os, subprocess, tempfile, wave
import numpy as np

SR = 32000
OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'audio')
rng = np.random.default_rng(74)

def t(sec): return np.arange(int(sec * SR)) / SR
def hz(n): return 440.0 * 2 ** ((n - 69) / 12)  # nota MIDI → Hz

def env(n, a=0.02, r=0.3):
    e = np.ones(n); A = max(1, int(a * SR)); R = max(1, min(n - A, int(r * SR)))
    e[:A] = np.linspace(0, 1, A); e[n - R:] *= np.linspace(1, 0, R); return e

def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR); y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x): s = (1 - a) * v + a * s; y[i] = s
    return y

def lp_fast(x, cutoff, passes=2):
    # filtro de un polo vectorizado por bloques (aprox.) con FFT
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / (1 + (f / cutoff) ** (2 * passes)); return np.fft.irfft(X, len(x))

def hp_fast(x, cutoff):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= (f / cutoff) ** 4 / (1 + (f / cutoff) ** 4); return np.fft.irfft(X, len(x))

def saw(f, tt): return 2 * ((f * tt) % 1) - 1

def pad(notes, dur, bright=900, det=0.004):
    tt = t(dur); y = np.zeros_like(tt)
    for n in notes:
        for d in (-det, 0, det): y += saw(hz(n) * (1 + d), tt + rng.random())
    y = lp_fast(y, bright); return y * env(len(tt), dur * 0.35, dur * 0.35) / (len(notes) * 3)

def bell(n, dur, decay=1.6):
    tt = t(dur); f = hz(n)
    y = np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * f * 2.76 * tt) * np.exp(-tt * 3) + 0.2 * np.sin(2 * np.pi * f * 5.4 * tt) * np.exp(-tt * 6)
    return y * np.exp(-tt * decay) * env(len(tt), 0.004, 0.05)

def piano(n, dur):
    tt = t(dur); f = hz(n); y = sum(np.sin(2 * np.pi * f * k * tt) / k ** 1.6 for k in range(1, 6))
    return y * np.exp(-tt * 2.2) * env(len(tt), 0.003, 0.08)

def drum(dur, f0=90, f1=45, decay=7, noise=0.25):
    tt = t(dur); f = f1 + (f0 - f1) * np.exp(-tt * 18)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) + noise * lp_fast(rng.standard_normal(len(tt)), 1800)) * np.exp(-tt * decay)

def snare(dur=0.25):
    tt = t(dur); return hp_fast(rng.standard_normal(len(tt)), 1200) * np.exp(-tt * 22) * 0.6

def place(buf, x, at):
    i = int(at * SR); j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i]

def noise_bed(dur, cutoff, rate=0.08, depth=0.5):
    tt = t(dur); n = lp_fast(rng.standard_normal(len(tt)), cutoff)
    lfo = 1 - depth / 2 + depth / 2 * np.sin(2 * np.pi * rate * tt + rng.random() * 6)
    return n / (np.abs(n).max() + 1e-9) * lfo

def loopify(y, fade=2.0):
    # mezcla el final con el principio para que el bucle no tenga corte
    F = int(fade * SR); y = y.copy(); ramp = np.linspace(0, 1, F)
    y[:F] = y[:F] * ramp + y[-F:] * (1 - ramp); return y[:-F]

def master(y, peak=0.7):
    y = y - y.mean(); y = np.tanh(y / (np.abs(y).max() + 1e-9) * 1.2); return y / np.abs(y).max() * peak

def stereo(y, width=0.004):
    d = int(width * SR); r = np.concatenate([np.zeros(d), y[:-d]]); return np.stack([y, 0.85 * r + 0.15 * y], 1)

def write(name, y, q=3):
    os.makedirs(OUT, exist_ok=True)
    st = (stereo(master(y)) * 32767).astype(np.int16)
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
        with wave.open(tmp.name, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
    dest = os.path.join(OUT, name + '.ogg')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp.name, '-c:a', 'libvorbis', '-q:a', str(q), dest], check=True)
    os.unlink(tmp.name); print(f'{dest} · {os.path.getsize(dest) // 1024} KB')

# ---------- Música ----------
def progresion(chords, bar, bright=900, extra=None):
    total = len(chords) * bar; y = np.zeros(int(total * SR) + SR * 3)
    for i, c in enumerate(chords): place(y, pad(c, bar + 2.5, bright), i * bar)
    if extra: extra(y, bar)
    return y[:int(total * SR) + 2 * SR]

def menu():  # solemne, campanas sobre acordes menores
    ch = [[45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59], [40, 47, 52, 56]] * 2
    def mel(y, bar):
        notas = [69, 72, 71, 67, 65, 69, 64, None, 69, 72, 74, 72, 71, 67, 69, None]
        for i, n in enumerate(notas):
            if n: place(y, bell(n, 3.2) * 0.35, i * bar / 2 + 0.2)
    return progresion(ch, 6.0, 700, mel)

def distrito():  # D12: pobre, cálido, guitarra de cuerdas pulsadas imitada con piano suave
    ch = [[45, 52, 57], [43, 50, 55], [41, 48, 53], [43, 50, 55]] * 2
    def arp(y, bar):
        for i, c in enumerate(ch):
            for k in range(8):
                place(y, piano(c[k % 3] + 12 + (12 if k % 4 == 3 else 0), 1.4) * 0.22, i * bar + k * bar / 8)
    return progresion(ch, 5.0, 600, arp)

def capitolio():  # brillante y frío: acordes mayores con séptima, campanas agudas
    ch = [[48, 55, 60, 64, 71], [53, 60, 65, 69, 76], [50, 57, 62, 65, 72], [55, 62, 67, 71, 74]] * 2
    def brillo(y, bar):
        for i in range(len(ch) * 4): place(y, bell(84 + [0, 4, 7, 11, 7, 4][i % 6], 1.8, 2.5) * 0.15, i * bar / 4)
    return progresion(ch, 5.0, 1600, brillo)

def arena():  # tensión: bordón grave, tambores lentos, golpe metálico
    dur = 48; y = np.zeros(int((dur + 3) * SR))
    for i in range(4): place(y, pad([33, 40, 45], 14.5, 380, ), i * 12)
    for b in range(int(dur / 0.857)):
        at = b * 0.857
        if b % 4 in (0, 3): place(y, drum(1.2, 85, 40) * (0.9 if b % 4 == 0 else 0.55), at)
        if b % 8 == 6: place(y, bell(57, 2.5, 3) * 0.18, at)
    return y[:int((dur + 2) * SR)]

def rebelion():  # marcha: caja, bombo y metal grave en modo menor
    ch = [[38, 45, 50], [41, 48, 53], [36, 43, 48], [38, 45, 50]] * 2; bar = 4.0
    def marcha(y, bar):
        for b in range(int(len(ch) * bar / 0.5)):
            at = b * 0.5
            if b % 4 == 0: place(y, drum(0.8, 70, 42) * 0.9, at)
            if b % 2 == 1: place(y, snare() * (0.7 if b % 4 == 3 else 0.4), at)
            if b % 8 in (0, 1, 2) and b % 2 == 0: place(y, snare() * 0.25, at + 0.25)
    return progresion(ch, bar, 520, marcha)

def guerra():  # más denso y oscuro que la rebelión
    ch = [[36, 43, 48, 51], [34, 41, 46, 50], [32, 39, 44, 48], [31, 38, 43, 47]] * 2; bar = 4.0
    def golpes(y, bar):
        for b in range(int(len(ch) * bar / 0.5)):
            at = b * 0.5
            if b % 2 == 0: place(y, drum(0.9, 95, 38, 6) * 0.8, at)
            if b % 4 == 3: place(y, snare() * 0.5, at)
            if b % 16 == 0: place(y, drum(2.5, 60, 28, 2.2, 0.6) * 0.7, at)
    return progresion(ch, bar, 450, golpes)

def final():  # epílogo: piano en mayor, lento y abierto
    ch = [[48, 55, 64], [45, 52, 60], [41, 48, 57], [43, 50, 59]] * 2
    def melodia(y, bar):
        notas = [76, 74, 72, 71, 72, 74, 76, 79, 77, 76, 74, 72, 74, 72, 71, 72]
        for i, n in enumerate(notas): place(y, piano(n, 3.0) * 0.4, i * bar / 2)
        for i, c in enumerate(ch):
            for k, n in enumerate(c): place(y, piano(n, 4.0) * 0.18, i * bar + k * 0.35)
    return progresion(ch, 6.0, 800, melodia)

def tren():  # Gira: traqueteo regular y acordes que avanzan
    ch = [[45, 52, 57, 61], [47, 54, 59, 62], [42, 49, 54, 57], [44, 51, 56, 59]] * 2; bar = 4.0
    def vias(y, bar):
        for b in range(int(len(ch) * bar / 0.25)):
            if b % 4 in (0, 1): place(y, drum(0.12, 160, 120, 40, 0.8) * 0.18, b * 0.25)
    return progresion(ch, bar, 800, vias)

# ---------- Ambientes ----------
def amb_bosque():
    dur = 40; y = noise_bed(dur, 900, 0.07, 0.6) * 0.35
    for _ in range(26):  # pájaros: barridos cortos
        at = rng.random() * (dur - 1); d = 0.12 + rng.random() * 0.2; tt = t(d)
        f = 2400 + 1600 * rng.random() + 1200 * np.sin(2 * np.pi * (6 + rng.random() * 8) * tt)
        place(y, np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.01, 0.06) * (0.08 + 0.1 * rng.random()), at)
    return y

def amb_reloj():  # olas del lago salado y tic-tac lejano
    dur = 36; tt = t(dur); y = noise_bed(dur, 700, 0.11, 0.95) * 0.5
    for s in range(dur): place(y, hp_fast(rng.standard_normal(int(0.02 * SR)), 2500) * np.exp(-np.arange(int(0.02 * SR)) / SR * 200) * 0.25, s + 0.5)
    return y

def amb_base():  # zumbido eléctrico, ventilación, pasos lejanos
    dur = 32; tt = t(dur)
    y = 0.12 * np.sin(2 * np.pi * 50 * tt) + 0.06 * np.sin(2 * np.pi * 100 * tt) + noise_bed(dur, 400, 0.05, 0.2) * 0.3
    for _ in range(10): place(y, drum(0.3, 120, 80, 25, 0.5) * 0.12, rng.random() * (dur - 1))
    return y

def amb_guerra():  # ciudad: viento, explosiones lejanas y ráfagas
    dur = 40; y = noise_bed(dur, 500, 0.09, 0.7) * 0.4
    for _ in range(7): place(y, drum(3.0, 55, 25, 1.6, 1.0) * (0.3 + 0.4 * rng.random()), rng.random() * (dur - 3))
    for _ in range(3):
        at = rng.random() * (dur - 2)
        for k in range(6): place(y, snare(0.08) * 0.15, at + k * 0.09)
    return y

PISTAS = {
    'mus-menu': menu, 'mus-distrito': distrito, 'mus-capitolio': capitolio, 'mus-arena': arena, 'mus-gira': tren,
    'mus-rebelion': rebelion, 'mus-guerra': guerra, 'mus-final': final,
    'amb-bosque': amb_bosque, 'amb-reloj': amb_reloj, 'amb-base-rebelde': amb_base, 'amb-ciudad-guerra': amb_guerra,
}

if __name__ == '__main__':
    for nombre, f in PISTAS.items(): write(nombre, loopify(f()))
