"""
soucet = 0
for i in range(1,11):
    soucet += i
print(soucet)
"""
"""
for i in range(1,6):
    print("*" * i)
"""
"""
soucet = 0
for i in range(1,51):
    if i %2 == 0:
        soucet += i
    else:
        continue
print(soucet)
"""
"""
vysledek = 0
for i in range(1,11):
    vysledek = 7 * i
    print(f"7 * {i} = {vysledek}")
"""
"""
seznam = [3, 5, 8, 12, 15, 21]
hledané_cislo = int(input("Zadej číslo, které chceš najit: "))
for i in seznam:
    if i == hledané_cislo:
        print(f"Číslo {hledané_cislo} bylo nalezeno v seznamu.")
        break
else:
    print(f"Číslo {hledané_cislo} nebylo nalezeno v seznamu.")
"""
"""
seznam = [10, 20, 30, 40, 50, 60]
vysledek = 0
for i in range(len(seznam)):
    if i %2 == 0:
        vysledek += seznam[i]
print(vysledek)
"""
"""
vysledek = 0
seznam = [1, 2, 3, 4, 5]
for i in seznam:
    vysledek = i**2
    print(f"Číslo {i} má druhou mocninu {vysledek}")
"""
"""
a, b = 0, 1
n = int(input("Zadej délku posloupnosti: "))
if n == 0 or n == 1:
    print(0)
else:
    for i in range(n):
        a, b = b, a + b
        print(a,end=",")
"""

