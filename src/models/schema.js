export const schema = {
  models: {
    Product: {
      name: "Product",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        product_name: {
          name: "product_name",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        product_description: {
          name: "product_description",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        product_status: {
          name: "product_status",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        product_price: {
          name: "product_price",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
        product_image: {
          name: "product_image",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        product_tags: {
          name: "product_tags",
          isArray: false,
          type: "AWSJSON",
          isRequired: false,
          attributes: [],
        },
        product_quantity: {
          name: "product_quantity",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        product_volume: {
          name: "product_volume",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Products",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["read"],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "a0079efe88751da2eafbd28986e2d71a",
};
