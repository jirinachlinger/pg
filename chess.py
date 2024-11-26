from abc import ABC, abstractmethod

class Piece(ABC):
    def __init__(self, color, position):
        """
        Inicializuje šachovou figurku.
        
        :param color: Barva figurky ('white' nebo 'black').
        :param position: Aktuální pozice na šachovnici jako tuple (row, col).
        """
        self.__color = color
        self.__position = position

    @abstractmethod
    def possible_moves(self):
        """
        Vrací všechny možné pohyby figurky.
        Musí být implementováno v podtřídách.
        
        :return: Seznam možných pozic [(row, col), ...].
        """
        pass

    @staticmethod
    def is_position_on_board(position):
        return 1 <= position[0] <= 8 and 1 <= position[1] <= 8

    @property
    def color(self):
        return self.__color

    @property
    def position(self):
        return self.__position

    @position.setter
    def position(self, new_postion):
        self.__position = new_postion

    def __str__(self):
        return f'Piece({self.color}) at position {self.position}'


class Pawn(Piece):
    def possible_moves(self):
        row, col = self.position
        moves = []
        
        # Pěšák se pohybuje o jedno nebo dvě pole vpřed
        if self.color == "white":
            if self.is_position_on_board((row + 1, col)):
                moves.append((row + 1, col))
            if row == 2 and self.is_position_on_board((row + 2, col)):
                moves.append((row + 2, col))
        elif self.color == "black":
            if self.is_position_on_board((row - 1, col)):
                moves.append((row - 1, col))
            if row == 7 and self.is_position_on_board((row - 2, col)):
                moves.append((row - 2, col))
                
        return moves
    
    def __str__(self):
        return f'Pawn({self.color}) at position {self.position}'


class Knight(Piece):
    def possible_moves(self):
        """
        Vrací všechny možné tahy jezdce.
        
        :return: Seznam možných pozic [(row, col), ...].
        """
        row, col = self.position
        moves = [
            (row + 2, col + 1), (row + 2, col - 1),
            (row - 2, col + 1), (row - 2, col - 1),
            (row + 1, col + 2), (row + 1, col - 2),
            (row - 1, col + 2), (row - 1, col - 2)
        ]
        # Filtruje tahy, které jsou mimo šachovnici
        final_moves = []
        for move in moves:
            if self.is_position_on_board(move):
                final_moves.append(move)
        return final_moves

    def __str__(self):
        return f'Knight({self.color}) at position {self.position}'


class Bishop(Piece):
    def possible_moves(self):
        row, col = self.position
        moves = []
        
        # Diagonální pohyby ve všech 4 směrech
        directions = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
        for dr, dc in directions:
            r, c = row, col
            while True:
                r, c = r + dr, c + dc
                if self.is_position_on_board((r, c)):
                    moves.append((r, c))
                else:
                    break
        return moves

    def __str__(self):
        return f'Bishop({self.color}) at position {self.position}'


class Rook(Piece):
    def possible_moves(self):
        row, col = self.position
        moves = []
        
        # Horizontální a vertikální pohyby
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        for dr, dc in directions:
            r, c = row, col
            while True:
                r, c = r + dr, c + dc
                if self.is_position_on_board((r, c)):
                    moves.append((r, c))
                else:
                    break
        return moves
    
    def __str__(self):
        return f'Rook({self.color}) at position {self.position}'


class Queen(Piece):
    def possible_moves(self):
        row, col = self.position
        moves = []
        
        # Pohyby jako u věže (horizontálně a vertikálně)
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
        for dr, dc in directions:
            r, c = row, col
            while True:
                r, c = r + dr, c + dc
                if self.is_position_on_board((r, c)):
                    moves.append((r, c))
                else:
                    break
        return moves

    def __str__(self):
        return f'Queen({self.color}) at position {self.position}'


class King(Piece):
    def possible_moves(self):
        row, col = self.position
        moves = []
        
        # Král se pohybuje o jedno pole ve všech směrech
        directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
        for dr, dc in directions:
            r, c = row + dr, col + dc
            if self.is_position_on_board((r, c)):
                moves.append((r, c))
        return moves
    
    def __str__(self):
        return f'King({self.color}) at position {self.position}'


if __name__ == "__main__":
    piece = Knight("black", (1, 2))
    print(piece)
    print(piece.possible_moves())