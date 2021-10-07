# PlaneInsuance
Une application décentralisée permettant à des voyageurs de souscrire à une assurance pour leur vols. Cette assurance sera gérée par un contrat intelligent au sein de la blockchain Ethereum.

L'assurance pourrait se décliner sous plusieurs contrat:
      - vol annulé, dédommagement à haute de 70% - 100%
      - vol retardé, dédommagement à hauteur de 10% - 20%

# 1. L'application web

## 1.1 Le front
Pour ce projet, je choisis d'utiliser du React pour faire une page Web permettant de réserver un vol à partir d'un wallet Web3 type Metamask.
Pour intégrer le bouton de connection au wallet Web3, je compte utiliser la librairie Web3JS.

Une seconde page existe aussi, permettant de faire une réclamation d'assurance, si le vol est assuré, un bouton à cet effet fera appel au smart contract d'assurance.

## 1.2 Le back
Les vols affichés sur cette page, seront tous réservables, et leurs données seront fournis par une base de données relationnel (techno pas encore choisie).
Par besoin de simplicité pour les tests, les vols seront donc des dummy datas, plus tard, il pourrait être intéressant d'utiliser une API d'un site de réservation en ligne pour afficher les vols disponibles réelement.

## 1.3 L'API
La base de données disposera d'une API permettant de fournir à son appelant, toutes les infos relatifs à un vol à partir de son numéro de vol.

# 2. L'application décentralisée

## 2.1 Un billet, sout forme d'NFT
Lorsque l'achat du billet par le wallet sera effectué, l'application donnera au wallet en échange, un token NFT du standard ERC 1155.
Ce type de token ont la particularité de pouvoir transporter des propriétés avec eux, dans lesquelles je souhaiterai stocker des données :
      - le numéro de vol
      - si le billet est assuré
      - le type d'assurance
     
## 2.2 Le Smart Contract
Le smart contract, si appelé par le bouton à cet effet, récupéra le NFT du wallet.
A partir du NFT, il regardera dans ses propriétés si il détient la valeur TRUE sur la propriété indiquant si le billet est assuré.
Et si il l'est, regardera quel type d'assurance.
Ensuite, grace à un Oracle, il fera un appel d'API à la base de données pour voir si ce vol est bien annulé, ou en retard.
Si le statut du vol corresponds au type d'assurance du billet, alors, le smart contract procédera au dédommagement.

