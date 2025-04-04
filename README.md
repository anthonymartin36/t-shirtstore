# T-ShirtStore
<h2>Online T-Shirt Store</h2>

<b>Description</b>

<p>
  Given our current econimic situation, its time to get entrepreneurial, so time to sell some T-Shirts online. This is an online T-Shirt store built with a Rails backend and a React frontend. 
  <b> User Stories </b>
<p>
<i>MVP</i>
As a non-registered troll toll operator:<br />
  <p>
* I want to view a list of T-shirts on the home page.<br />
* I want to be able to view a category of T-shirts. <br />
* I want to view an individual T-shirt. <br />
  </p><p>
* I want to personalise an individual T-shirt. <br />
* I want to change the color of the t-shirt. <br />
* I want to change the size of the t-shirt. <br />
  </p><p>
* I want the customer to create an account. <br />
* I want the customer to be able to login an account. <br />  
* I want the customer to be able to logout an account. <br />  
  </p><p>
* I want to add an item to a Wishlist. <br />
* I want to remove an item to a Wishlist. <br />
  </p><p>
* I want to add an item to a Shopping Cart. <br />
* I want to remove an item to a Shopping Cart. <br />
  </p><p>
* I want to remove an item to a Wishlist. <br />
* I want to add an item from a Wishlist to a cart. <br />
* I want to add an item to a Shopping Cart from a Wishlist. <br />
  </p><p>  
* I want to complete a purchase. <br />
* I want to confirm the shipping of a purchase, via email. <br />
* I want the customer to be able to logout an account. <br />  
  <p>
<br />
</p>
</p>

<b>Database ERD</b>
<p>
Here is a breakdown of the Database entity relationship diagram. 
<u>Tables</u>
<br />
* Customer<br />
* Order<br />
* Order_Item<br />
* Product<br />
* Catagory<br />
* Shipment<br />
* Payment<br />
* Cart<br />
* Wishlist<br />
</p>
![ERD Image](https://github.com/user-attachments/assets/8d447bd2-0cf5-41b0-88b9-9b6a716aaf12)

<b> API Calls </b>
<p>
### API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | /api/v1/product | No | Get all products | Array of Product Objects |
| Get | /api/v1/product/:id | No | Get one product with associated| Single Product Data |
| Post| /api/v1/product/:id/ | No | Post customer t-Shirt colour | Single Product Data |

| Get* | /api/v1/cart | Yes | Get all cart products | Array of Product Objects from Cart for specific customer |
| Post* | /api/v1/cart/new | Yes | add a cart product to a customers cart table | Array of Product Objects for specific customer |
| PATCH* | /api/v1/wishlist/update | Yes | update a wishlist product to a customers wishlist table | Array of Product Objects for specific customer |
| DELETE* | /api/v1/wishlist/delete | Yes | delete a wishlist product to a customers wishlist table | Should return nothing |

| Get* | /api/v1/wishlist | Yes | Get all wishlist products | Array of Product Objects from Wishlist for specific customer |
| Post* | /api/v1/wishlist/new | Yes | add a wishlist product to a customers wishlist table | Array of Product Objects for specific customer |
| PATCH* | /api/v1/wishlist/update | Yes | update a wishlist product to a customers wishlist table | Array of Product Objects for specific customer |
| DELETE* | /api/v1/wishlist/delete | Yes | delete a wishlist product to a customers wishlist table | Should return nothing |

| Post*| /api/v1/auth/register | Yes | Register a Customer | The Customer's JWT Token |
| Post* | /api/v1/auth/login | Yes | Log In Customer| The Customer's JWT Token |
| Post* | /api/v1/auth/logout | Yes | Log Out Customer | The Customer's JWT Token |

Endpoints with a * are stretch
</p>




