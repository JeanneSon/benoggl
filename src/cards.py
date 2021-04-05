suits = ['acorns', 'bells', 'hearts', 'leaves']
ranks = ['7', 'unter', 'ober', 'king', '10', 'ace']

deck = []
for suit in suits:
    for rank in ranks:
        deck.append(suit + "_" + rank)
        deck.append(suit + "_" + rank)