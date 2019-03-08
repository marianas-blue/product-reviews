
# Product-reviews

Product reveiws component for product description page

## API routes:

### GET
#### 1. `/api/product/product-id-number/summary_engagements`

Fetches summary level engagements for product
   
#### 2. `/api/product/{product-id-number}/pictures`
  
Fetches user generated picture content for display. 

#### 3. `/api/product/{product-id-number}/reviews_all`
  
Fetches all reviews for product

#### 4. `/api/product/{product-id-number}/reviews_top8/recent`

Fetches the top 8 reviews as ranked by most recent.


#### 4. `/api/product/{product-id-number}/reviews_top8/rated`

Fetches the top 8 reviews as ranked by highest rated.
  
  
  
### POST
#### 1. `/api/product/{product-id-number}/savereview`

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
   
#### 3. `/api/product/{product-id-number}/abuse_flag/review/{review-id-number}`
  
Passes a possible abusive content tag per review


#### 4. `/api/product/{product-id-number}/helpful_flag/review/{review-id-number}`

Passes a helpful content tag per review

#### 5. `/api/product/{product-id-number}/abuse_flag/comment/{comment-id-number}`
  
Passes a possible abusive content tag per comment


#### 6. `/api/product/{product-id-number}/helpful_flag/comment/{comment-id-number}`

Passes a helpful content tag per comment

