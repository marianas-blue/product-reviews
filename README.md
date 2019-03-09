
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

Saves a user entered review on product

```javascript

{"product_ratings":5,"review":"Totally a good thing. I like it!","review_title":"This thing is the best!","reviewer":"This guy","image":"https://s3.amazonaws.com/marianas-amazon/cat5.jpg", "time_of_review": 1543650500}

```

#### 2. `/api/product/{product-id-number}/savecomment/{review-id-number}`
  
Saves a user entered comment on review

```javascript

{"comment":"Totally a good thing. I like it!","commentor":"This guy","image":"https://s3.amazonaws.com/marianas-amazon/cat5.jpg", "time_of_comment": 1543650500}

```

#### 3. `/api/product/{product-id-number}/helpful_flag/review/{review-id-number}`

Passes a helpful content tag per review

```javascript

{"username":"Mr. Foundithelpful","time_of_event":12345}

```

### UPDATE

#### 1. `/api/product/{product-id-number}/editreview/{review-id-number}`
  
Edits a user entered comment on review

```javascript

{"product_ratings":5,"review":"Totally a good thing. I like it!","review_title":"This thing is the best!","reviewer":"This guy","image":"https://s3.amazonaws.com/marianas-amazon/cat5.jpg", "time_of_review": 1543650500}

```


