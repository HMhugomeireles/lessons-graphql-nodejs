import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Pizza {
    id: Int!
    pizza: String!
    stock: Int!
    toppings: [Topping!]!
  }

  type Topping {
    id: Int!
    topping: String!
  }

  type Query {
    pizzas: [Pizza]
  }

  type Mutation {
    createPizza(pizza: String, toppings: [ToppingInput!]!): Pizza!
  }
`;

const resolvers = {
  Query: {
    pizzas: (_parent: any, _args: any, _context: any) => {
      const pizzas = [
        { 
          id: 1,
          pizza: "Neapolitan Pizza",
          toppings: {id: 1, topping: "Cheesy"}
        },
      ];
      return pizzas;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}). then(({url}) => console.log(`🚀  Server ready at: ${url}`));

