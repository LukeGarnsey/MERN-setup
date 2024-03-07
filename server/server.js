const express = require('express');
const {ApolloServer} = require('@apollo/server');
const { expressMiddleware} = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({extended:false}));
  app.use(express.json());

  if(process.env.NODE_ENV === 'production'){

  }
  app.get('/chatgpt', async (req, res)=>{
    try{
      res.send("Hello to chat GPT hopefully");
    }catch(error){
      res.status(500).json({message:error});
    }
  })

  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API SErver running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    })
  })
};

startApolloServer();