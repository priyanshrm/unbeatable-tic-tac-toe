from random import randint

def printInstructions():
    print("\nThis is a representation of the board.\
    \nPlease choose from below positions only \nto play your moves.\n")
    for i in [0,3,6]:
        print(f'{i} {i+1} {i+2} \t',end=' ')
        print('- - -')
    print()

def printBoard(board):
    for i, e in enumerate(board):
        k = '-'
        if type(e) == int:
            e = k
        if i%3 == 0 and i!=0:
            print(f'\n{e}',end=' ')
        else:
            print(f'{e}', end=' ')
    print()     


def isWinner(board, player):
    combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [
        0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for c in combinations:
        if board[c[0]] == player and board[c[1]] == board[c[2]] and board[c[2]] == player:
            return True
    return False

def minimax(board, player, players):
    availableSpots = [x for x in board if type(x) == int]
    if(isWinner(board, players[0])):
        return [-1,10]
    elif(isWinner(board, players[1])):
        return [-1, -10]
    elif(len(availableSpots) == 0):
        return [-1,0]
    
    moves = [] # collects all the moves for future evaluation
    
    for spot in availableSpots:
        move = [-1,-1] # collect 0-> spot and 1-> score
        move[0] = board[spot] # position
        board[spot] = player

        if (player == players[0]):
            result = minimax(board, players[1], players)
            move[1] = result[1]
        else:
            result = minimax(board, players[0], players)
            move[1] = result[1]
        
        board[spot] = move[0] # backtrack
        moves.append(move)
    
    idealMove = -1
    
    if player == players[0]:
        bestScore = -1000
        for i in range(len(moves)):
            # print(len(moves))
            if moves[i][1] > bestScore:
                bestScore = moves[i][1]
                idealMove = i
    else:
        worstScore = 1000
        for i in range(len(moves)):
            if moves[i][1] < worstScore:
                worstScore = moves[i][1]
                idealMove = i
    
    return moves[idealMove]

def play(board, human, ai):
    
    printBoard(board)
    availableSpots = [x for x in board if type(x) == int]
    if len(availableSpots) == 0:
        print('TIE')
        return
    spot = int(input("Enter your choice: "))
    while spot not in availableSpots:
        spot = int(input(f'Please chose {availableSpots}: '))
    board[spot] = human
    availableSpots.remove(spot) # remove used spot (by user)
    if len(availableSpots) == 0:
        printBoard(board)
        print('TIE')
        return
    spot2 = minimax(board, ai, [ai,human]) # spot, score
    board[spot2[0]] = ai
    if isWinner(board, ai):
        printBoard(board)
        print('AI wins')
        return
    elif isWinner(board, human):
        printBoard(board)
        print('You win')
        return
    else:
        play(board, human, ai)

def main():
    board = [
        0,1,2,
        3,4,5,
        6,7,8
    ]
    printInstructions()
    human = input("Enter your choice (x/o): ")
    while human not in ['x','o']:
        human = input("Please choose from (x/o): ")
    ai = 'o' if human == 'x' else 'x'
    playsecond = input('Let AI make the first move (y/n): ')

    if playsecond == 'n' or playsecond == 'no':
        play(board, human, ai)
    else :
        board[randint(0, 8)] = ai
        play(board, human, ai)

main()