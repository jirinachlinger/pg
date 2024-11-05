import sys

# definice úvodních binárních sekvencí obrázkových souborů
jpeg_header = b'\xff\xd8'
gif_header1 = b'GIF87a'
gif_header2 = b'GIF89a'
png_header = b'\x89\x50\x4E\x47\x0D\x0A\x1A\x0A'
#png_header = b'\x89PNG\r\n\x1a\n'


def read_header(file_name, header_length):

    with open(file_name, "rb") as img_file:
        header = img_file.read(header_length)
    return header
    """
    with open(file_name,"rb") as file:
        header = file.read(header_length)
    return header

    
    Tato funkce načte binární soubor z cesty file_name,
    z něj přečte prvních header_length bytů a ty vrátí pomocí return
    """


def is_jpeg(file_name):
    
    header = read_header(file_name, len(jpeg_header))
    return header.startswith(jpeg_header)
    """
    if header == jpeg_header:
        return True
    else:
        return False

    
    Funkce zkusí přečíst ze souboru hlavičku obrázku jpeg,
    tu srovná s definovanou hlavičkou v proměnné jpeg_header
    """

def is_gif(file_name):

    header = read_header(file_name, len(gif_header1))
    return header == gif_header1 or header == gif_header2    
    """
    if header == gif_header1 or header == gif_header2:
        return True
    else:
        return False

    
    Funkce zkusí přečíst ze souboru hlavičku obrázku jpeg,
    tu srovná s definovanými hlavičkami v proměnných gif_header1 a gif_header2
    """
    # vyhodnoť zda je soubor gif


def is_png(file_name):

    header = read_header(file_name, len(png_header))
    return header.startswith(png_header)
    """
    Funkce zkusí přečíst ze souboru hlavičku obrázku jpeg,
    tu srovná s definovanou hlavičkou v proměnné png_header
    """
    # vyhodnoť zda je soubor png


def print_file_type(file_name):
    """
    Funkce vypíše typ souboru - tuto funkci není třeba upravovat
    """
    if is_jpeg(file_name):
        print(f'Soubor {file_name} je typu jpeg')
    elif is_gif(file_name):
        print(f'Soubor {file_name} je typu gif')
    elif is_png(file_name):
        print(f'Soubor {file_name} je typu png')
    else:
        print(f'Soubor {file_name} je neznámého typu')


if __name__ == '__main__':

    try:
        # přidej try-catch blok, odchyť obecnou vyjímku Exception a vypiš ji
        file_name = sys.argv[1]
        print_file_type(file_name)
    except FileNotFoundError:
        print("Soubor nebyl nalezen, vložte prosím jiný")
    except IndexError:
        print("Chyba v psaní")
    except Exception as e:
        print(f"Nastala neočekávaná chyba: {e}")