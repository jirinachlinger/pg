def jaccardova_vzdalenost_mnozin(mnozina1, mnozina2):
    pass

    mnozina1 = set(mnozina1)
    mnozina2 = set(mnozina2)

    prunik = mnozina1.intersection(mnozina2)
    sjednoceni = mnozina1.union(mnozina2)

    jacard_index = len(prunik)/len(sjednoceni)
    jaccardova_vzdalenost_mnozin = 1 - jacard_index
    return jaccardova_vzdalenost_mnozin

if __name__ == "__main__":
    serp1 = ["https://www.seznam.cz", "https://www.google.com", "https://www.jcu.cz", "https://www.czu.cz", "https://www.cvut.cz", "https://www.uk.cz"]
    serp2 = ["https://www.seznam.cz", "https://www.google.com", "https://www.novinky.cz", "https://www.idnes.cz", "https://www.zpravy.cz", "https://www.tn.cz"]
    serp3 = ["https://www.jcu.cz", "https://www.czu.cz", "https://www.cvut.cz", "https://www.uk.cz"]

    print(jaccardova_vzdalenost_mnozin(serp1, serp2))
    print(jaccardova_vzdalenost_mnozin(serp2, serp3))
    print(jaccardova_vzdalenost_mnozin(serp1, serp3))


