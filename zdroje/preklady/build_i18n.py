import sys,json,re,glob,os
# použitie (z koreňa repozitára): python3 zdroje/preklady/build_i18n.py project/i18n.js zdroje/preklady/m_dict.txt
out=sys.argv[1]; D={}; PATS=[]; PLUR=[]; bad=0
for fn in sys.argv[2:]:
    for ln,line in enumerate(open(fn,encoding='utf-8').read().split('\n'),1):
        if not line.strip() or (line.startswith('#') and '|||' not in line): continue
        parts=[x.strip() for x in line.split('|||')]
        if len(parts)!=5: print('BAD',fn,ln,len(parts),line[:80]); bad+=1; continue
        sk,tr=parts[0],parts[1:]
        if re.fullmatch(r'[^|{}]+(\|[^|{}]+){2}',sk) and all(x.count('|')==2 for x in tr): PLUR.append([sk.split('|'),[x.split('|') for x in tr]])
        elif re.search(r'\{\dw?\}',sk): PATS.append([sk,tr])
        else: D[sk]=tr
PATS.sort(key=lambda p:-len(re.sub(r'\{\dw?\}','',p[0])))
eng=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'engine.js'),encoding='utf-8').read()
J=lambda o: json.dumps(o,ensure_ascii=False,separators=(',',':'))
eng=eng.replace('/*WZ_DICT*/{}',J(D)).replace('/*WZ_PATS*/[]',J(PATS)).replace('/*WZ_PLUR*/[]',J(PLUR))
vp=os.path.join(os.path.dirname(os.path.abspath(out)),'ver.js')
if os.path.exists(vp): eng=eng.rstrip('\n')+'\n'+open(vp,encoding='utf-8').read()
open(out,'w',encoding='utf-8',newline='').write(eng)
print('i18n.js',len(eng),'dict',len(D),'pats',len(PATS),'plur',len(PLUR),'bad',bad)
