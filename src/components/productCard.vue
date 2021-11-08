<template>
  <div class="main card large">
    <div class="is-flat">
      <div class="card-image">
        <figure class="image is-3by4">
          <img
            :src="product.product_image"
            alt="Placeholder Drinks"
            class="modal-button"
            data-target="modal-image2"
          />
        </figure>
      </div>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content media-left has-text-left">
          <p class="title is-4 no-padding">{{ product.product_name }}</p>
        </div>
        <div class="media-right has-text-right">
          <figure class="image is-48x48">
            <p class="title is-5 no-padding">${{ product.product_price }}</p>
          </figure>
        </div>
      </div>
      <div class="content has-text-left">
        {{ product.product_description }}
        <div class="background-icon"><span class="icon-twitter"></span></div>
      </div>
      <div class="buttons">
        <b-button
          v-if="!product.isInCart"
          type="is-primary"
          expanded
          @click="$store.dispatch('product/addProductToCartAction', product.id)"
          >ADD TO CART</b-button
        >
        <b-button
          v-if="product.isInCart"
          type="is-warning"
          expanded
          @click="
            $store.dispatch('product/removeProductFromCartAction', product.id)
          "
          >REMOVE FROM CART</b-button
        >
        <b-field
          v-if="product.isInCart"
          label="Quantity"
          label-position="on-border"
        >
          <b-numberinput
            v-model="product.quantity"
            :min="1"
            :max="product.product_quantity"
          ></b-numberinput>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    //
  }),
  props: ["product"],
  created() {
    console.log(this.product);
  },
};
</script>

<style>
.card {
  overflow: hidden;
  background: ghostwhite;
  color: var(--bg);
  max-width: 300px;
}

.card.large {
  border-radius: 5px;
}

.title.no-padding {
  margin-bottom: 0 !important;
}
</style>
