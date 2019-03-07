
# Product-reviews

Product reveiws component for product description page

## API routes:

### GET
#### 1. `/api/product/product-id-number/summary_engagements`

Fetches summary level engagements for product
   
#### 2. `/api/product/{product-id-number}/pictures/{review-id-number}/{display|viewer}`
  
Fetches user generated picture content for display. 

  * display: 4 pictures for default display
   
  * viewer: All images for picture explorer modal

#### 3. `/api/product/{product-id-number}/reviews_all`
  
Fetches all reviews for product

#### 4. `/api/product/{product-id-number}/reviews_top8/{sort_key}`

Fetches the top 8 reviews as ranked by the sort key.

  * recent: most recent reviews
   
  * top: highest average star ranking
  
  
  
### POST
#### 1. `/api/product/product-id-number/savereview`

Saves a user entered comment on product

```javascript

{ 
  product_id: Number,
  product_ratings: Number,
  review: String,
  review_title: String,
  reviewer: String,
  image: String 
}

```

#### 2. `/api/product/{product-id-number}/savecomment/{review-id-number}`
  
Saves a user entered comment on review

```javascript

{ 
  product_id: Number,
  review_id: Number
  comment: String,
  comment_title: String,
  commentor: String,
  image: String,
}

```
   
#### 3. `/api/product/{product-id-number}/abuse_flag/{review|comment}/{id-number}`
  
Passes a possible abusive content tag per review or comment


#### 4. `/api/product/{product-id-number}/helpful_flag/{review|comment}/{id-number}`

Passes a helpful content tag per review

