/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      product_name
      product_description
      product_status
      product_price
      product_image
      product_tags
      product_quantity
      product_volume
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        product_name
        product_description
        product_status
        product_price
        product_image
        product_tags
        product_quantity
        product_volume
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
