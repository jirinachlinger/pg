def je_prvocislo(cislo):

    if int(cislo) <= 1:
        return False
        #print("False")
    else:
        for i in range(2, int(cislo**0.5) + 1):
            if cislo % i == 0:
                return False
                #print("False")
                break
        else:
                return True
                #print("True")


    """
    Funkce overi, zda zadane cislo je nebo neni prvocislo a vrati True nebo False

    Prvocislo je takove cislo vetsi nez 1, ktere neni delitelne zadnym jinym cislem jenom 1 a samo sebou.

    Napoveda jak otestova prvocislo:
    Cislo 36 vznikne nasobenim:
    1 * 36
    2 * 18
    3 * 12
    4 * 9
    6 * 6
    9 * 4
    12 * 3
    18 * 2
    36 * 1
    Jak vidite v druhe polovine se dvojice opakuji, tzn. v tomto pripade staci overit delitelnost pouze do 6 (vcetne)
    """

def vrat_prvocisla(maximum):

    seznam_prvocisel = []
    for n in range (2, int(maximum) + 1):
        if je_prvocislo(n):
            seznam_prvocisel.append(n)
    return seznam_prvocisel

 

if __name__ == "__main__":
     
    cislo = input("Zadej maximum: ")
    prvocisla = vrat_prvocisla(cislo)
    print(prvocisla)