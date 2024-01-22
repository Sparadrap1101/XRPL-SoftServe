# SoftServe - A Platform for Artwork's Intellectual Property

**SoftServe** is a Proof of Concept project made on the XRP Ledger with the objective to issue Artworks' **IP certificates** in order to protect them from counterfeit or copy.

![](./src/banniere.png)

We provide a **fraud proof** system that verify if an artwork already has an IP certificate and is store on our database. If it's a new one we create a new certificate for this artwork and send it on-chain.

## Pre-Requisite

- `Python` already installed
- `Node.js` already installed

## Set-Up

Clone this repository first by opening a new terminal, go to the folder you want and run:

```
git clone https://github.com/Sparadrap1101/XRPL-SoftServe
```

### Server side

Then, go to the server folder `../XRPL-SoftServe/server` and install the server dependencies:

```
cd XRPL-SoftServe/server
```

```
npm install
```

Now start the server with:

```
node index.js
```

### Client side

Open a new terminal, go to this folder `../XRPL-SoftServe` and install the client dependencies:

```
npm install
```

Then start the client with:

```
npm start
```

You can now go to [http://localhost:3000](http://localhost:3000) on your browser and interact with the App!
