#IFFFFFFFFF
"""
    try:
        mesic = int(input("Zadej číslo měsíce: "))
        if mesic in [3,4,5]:
            print("jaro")
        elif mesic in [6,7,8]:
            print("léto")
        elif mesic in [9,10,11]:
            print("podzim")
        elif mesic in [12,1,2]:
            print("zima")
        else:
            print("neplatný měsíc, zadejte číslo od 1 do 12")
    except ValueError:
        print("neplatný vstup, zkuste to znovu")
"""
"""
    try:
        cislo_x = int(input("zadej 1. číslo: "))
        cislo_y = int(input("zadej 2. číslo: "))
        if cislo_x == cislo_y:
            print("čísla se rovnají")
        elif cislo_x > cislo_y:
            print("1. číslo je větší ")
        elif cislo_y > cislo_x:
            print("2. číslo je větší")
    except ValueError:
        print("Je potřeba zadat číslo, zkus znovu")
"""
#WHILEEEEE
"""
for i in range(1,11):
    print (i)
"""
"""
pokus = 3
while pokus > 0:
    heslo = input("zadej heslo: ")
    if heslo == "tajneheslo":
        print("pristup udelen")
        break
    else:
        pokus -= 1
        print(f"spatne heslo, zbyvajici pokusy: {pokus}")
if pokus == 0:
    print("pristup trvale zamitnut.")
"""
"""
seznam = ["alice","bob","charlie","diana"]
for jmeno in seznam:
    if jmeno == "bob":
        print(f"ahoj, {jmeno}, jsi vítán.")
    else:
        print(f"ahoj, {jmeno}.")
"""
"""
seznam = ["jablko","banán","hruška","třešeň"]
seznam.append("jahoda")
seznam.insert(1,"broskev")
print(seznam)

slovnik = {"jmeno": "Alice", "vek":20 , "mesto": "Brno"}
slovnik["oblibeny_predmet"] = "python"
slovnik.update({"vek": 21})
print(slovnik)

mnozina = {1,2,3,4,5,}
mnozina.add(6)
if 3 in mnozina:
    print("True")
else:
    print("False")
print(mnozina)

n_tice = ("červená","modrá","zelená")
druhy_prvek = n_tice[1]
print(druhy_prvek)
print(n_tice)

seznam = ["mléko", "chléb", "vajíčka", "máslo"]
seznam.append(input("zadej další položku: "))
seznam.remove("chléb")
seznam.sort()
print(seznam)


slovnik = {
    "1984" : "George Orwell",
    "Pýcha a předsudek": "Jane Austen"
}
nova_kniha = input("Zadej název nové knihy: ")
novy_autor = input("Zadej název autora: ")
slovnik[nova_kniha] = novy_autor
kontrola_knihy = input("Zadej název knihy pro kontrolu: ")
if kontrola_knihy in slovnik:
    print("true")
else:
    print("false")

print("seznam knih a autorů")
for kniha, autor in slovnik.items():
    print(f"{kniha}: {autor}")


for i in range(20,0,-1):
    if i %2 == 0:
        print(f" {i} je sudá")
    else:
        print(f" {i} je lichá")


a, b = 0, 1
n = 10
for i in range(n):
    if i < n-1:
        print(a,end=",")
    else:
        print(a)
    a, b= b, a + b
"""