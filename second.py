def cislo_text(cislo):

    jednotky = ["nula", "jedna", "dva", "tři", "čtyři", "pět", "šest", "sedm", "osm", "devět"]
    desitky = ["", "deset", "dvacet", "třicet", "čtyřicet", "padesát", "šedesát", "sedmdesát", "osmdesát", "devadesát"]
    deset_devatenáct = ["deset", "jedenáct", "dvanáct", "třináct", "čtrnáct", "patnáct", "šestnáct", "sedmnáct", "osmnáct", "devatenáct"]

    zadavane_cislo = int(cislo)

    if zadavane_cislo < 10:
        return jednotky[zadavane_cislo]
    elif zadavane_cislo >= 10 and zadavane_cislo < 20:
        return deset_devatenáct[zadavane_cislo]
    elif zadavane_cislo >= 20 and zadavane_cislo < 100:
        desitka = zadavane_cislo // 10
        jednotka = zadavane_cislo % 10
        if jednotka == 0: 
            return desitky[desitka]
        else:
            return desitky[desitka] + " " + jednotky[jednotka]
    elif zadavane_cislo == 100:
        return "sto"
    elif zadavane_cislo > 100:
        return "Zadavané číslo je větší jak 100"

if __name__ == "__main__":
        cislo = input("Zadej číslo: ")
        text = cislo_text(cislo)
        print(text)