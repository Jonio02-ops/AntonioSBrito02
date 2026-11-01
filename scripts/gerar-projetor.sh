#!/usr/bin/env bash
# Sintetiza o ruído de projetor (cliques rítmicos + chiado baixo + zumbido) com ffmpeg.
# Gera public/projetor.wav (10 s, loop perfeito: 18 cliques/s × 10 s).
set -euo pipefail
cd "$(dirname "$0")/.."
ffmpeg -y -loglevel error -f lavfi -i "aevalsrc='\
0.45*exp(-mod(t,1/18)*260)*(random(0)*2-1)*(0.7+0.3*lt(mod(t,2/18),1/18))\
 + 0.05*(random(1)*2-1)\
 + 0.025*sin(2*PI*55*t)\
 + 0.015*sin(2*PI*9*t)*sin(2*PI*110*t)':s=44100:d=10" \
  -af "highpass=f=60,lowpass=f=5500,volume=0.9" -ac 1 public/projetor.wav
echo "public/projetor.wav gerado"
