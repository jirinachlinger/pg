# funkce vrati treti prvek ze seznamu
#def vrat_treti(seznam):
 #    if len(seznam) < 3:
  #   # zjisti mi délku seznamu, když je delší a rovno 3
   #     return None
     #else:
      #   return seznam[2]


# funkce spocita prumer z hodnot v seznamu
#def udelej_prumer(seznam):
   # return sum(obalka)/ len(obalka)
  #  print(prumer)



# funkce naformatuje retezec, aby vratila text ve formatu:
# "Jmeno: Jan, Prijmeni: Novak, Vek: 20, Prumerna znamka: 2.5"
def naformatuj_text(slovnik):
    jmeno = slovnik["jmeno"]
    prijmeni = slovnik["prijmeni"]
    vek = slovnik ["vek"]
    prumer = sum(slovnik["znamky"]) / len(slovnik["znamky"])
    return f"Jméno: {jmeno},Příjmení: {prijmeni},Věk: {vek},Průměr žáka:: {prumer}"


if __name__ == "__main__":
    #seznam = [9,8,5]
    #seznam = [9,8,7,6,5]
    #vysledek = vrat_treti(seznam)
    #print(vysledek)

    #obalka = [9,8,7,6,5]
    #vysledek = udelej_prumer(obalka)
    #print(vysledek)
    #print(vrat_treti([9,8,7,6,5]))
    #print(udelej_prumer([9,8,7,6,5]))

    student = {
        "jmeno": "Matěj",
        "prijmeni": "Dvořák",
        "vek": 21,
        "znamky": [1, 2, 1, 1, 3, 2]
    }
    vysledek = naformatuj_text(student)
    print(vysledek)

    #student["znamky"][2]
    #student["vek"]

    #a = 1
    #f"Naformatovany retezec s hodnotou {a}"     #Naformatovany retezec s hodnotou 1