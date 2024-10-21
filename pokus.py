#import sys


#def main(soubor):
#    otevreny_soubor = open(soubor, "r")
#    for radka in otevreny_soubor:
#        parametry = radka.split(",")
#        vek = int(parametry[2])
#        if vek > 20:
#            print(vek)

#    print(f"Parametr obsahuje '{parametr}'")

#if __name__ == " _main_":
#    if len(sys.argv)<= 1:
#        print("Zadej název souboru")
#        sys.exit(1)
#    soubor = sys.argv[1]
#    main(soubor)


#if _name_=="_main_":
    #jmeno = input("zadej jmeno: ")
    #main(jmeno)
    #prijmeni = input("Zadej prijmeni")


cislo = int(input("Zadej číslo: "))

if int(cislo) <= 1:
        #return False
        print("False")
else:
    for i in range(2, int(cislo**0.5) + 1):
        if cislo % i == 0:
            #return False
            print("False")
            break
    else:
        #return True
        print("True")



#def vrat_prvocisla(maximum):
maximum = cislo
vrat_prvocisla = (maximum)
seznam_prvocisel = []
for n in range(2, maximum + 1):
    if int(cislo(n)):
        seznam_prvocisel.append(n)
    print(seznam_prvocisel)
