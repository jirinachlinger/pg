import sys
"""
def soucet(a,b):
    return a + b

def fibo(max):
    result = [1,1]
    soucet = result[-2] + result[-1]
    while soucet < max:
        result.append(soucet)
        soucet = result[-2] + result[-1]
    return result

if __name__ == "__main__"
    res = fibo(5)
    print(res)
"""
"""
def pozpadku(text):
    text_pozpadku = ""
    for pismeno in reversed(text):
        text_pozpadku += pismeno
    return text_pozpadku¨
"""

def pozpadku(text):
    text_pozpadku = ""
    i = len(text)-1
    while i >= 0:
        pismeno =text[i]
        text_pozpadku += pismeno
        i -= 1
    return text_pozpadku


if __name__=="__main__":
    try:
        soubor = sys.arvg[1]
        with open(soubor,"r") as fp:
            obsah = fp.read()
            obracene = pozpadku(obsah)
            print = obracene
    except IndexError:
        print("zadej nazev souboru")
    except FileNotFoundError:
        print("soubor neexistuje")