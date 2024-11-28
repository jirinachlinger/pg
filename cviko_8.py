
def obvod_ctverce(delka_strany):
    # funkce vypocita obvod ctverce z delky jeho strany
    obvod = delka_strany * 4

def obsah_ctverce(delka_strany):
    # funkce vypocita obsah ctverce z delky jeho strany
    obsah = delka_strany**2


def pocet_pismen(text, pismeno):
    pocet = 0
    for i in text:
        if i == pismeno:
            pocet +=1
    return pocet

def index_pismene(text, pismeno):
    # funkce vrati indexy daneho pismene v textu, tzn. pro text="ahoj, honzo" a pismeno="h" vrati [1, 6]
    i = 0
    indexy = []
    while i < len(text):
        if text[i] == pismeno:
            indexy.append(i)
        i += 1
    return indexy

def fibo(max):
    result = [1,1]
    soucet = result[-2] + result[-1]
    while soucet < max:
        result.append(soucet)
        soucet = result[-2] + result[-1]
    return result


if __name__ == "__main__":
    index_pismene("ahoj, honzo","h")
