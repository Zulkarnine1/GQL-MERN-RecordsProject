module.exports = `

    type Record {
        _id:ID!
        title:String!
        file:String!
        content:String!
        creator:User!
        private:Boolean!
    }
`;
