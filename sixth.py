import sys
import requests
import re


def download_url_and_get_all_hrefs(url):
    """
    Funkce stahne url predanou v parametru url pomoci volani response = requests.get(),
    zkontroluje navratovy kod response.status_code, ktery musi byt 200,
    pokud ano, najdete ve stazenem obsahu stranky response.content vsechny vyskyty
    <a href="url">odkaz</a> a z nich nactete url, ktere vratite jako seznam pomoci return
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        html_content = response.text
        hrefs = re.findall(r'<a\s+(?:[^>]*?\s+)?href="([^"]+)"', html_content)
        return hrefs
    except requests.RequestException as e:
        print(f"Chyba při stahování stránky: {e}")
        return []
   


if __name__ == "__main__":
    try:
        # Načtení URL z argumentu příkazové řádky
        url = sys.argv[1]
        # Zavolání funkce ke stažení a zpracování odkazů
        links = download_url_and_get_all_hrefs(url)
        print(f"Nalezené odkazy na stránce {url}:")
        for link in links:
            print(link)

    except IndexError:
        # Ošetření případu, kdy uživatel nezadá URL jako argument
        print("Chyba: Nebyla zadána URL. Použití: python sixth.py <URL>")
    except Exception as e:
        # Ošetření všech ostatních chyb
        print(f"Program skončil chybou: {e}")
