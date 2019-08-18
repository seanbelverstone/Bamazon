#Bamazon

##Overview
A shopping app for customers and managers alike! Much like the famous shopping website with the same name, this allows a user to view current stock and purchase items. It also allows a manager to enter the application to view the stock, view low stock, add more inventory and even add a new item.

Having the option to buy stock as a customer, but also add more as a manager has many useful benefits, the main one being the fact that you can replenish stock that has been otherwise used up. If there was no manager page, eventually no-one would be able to buy anything.

##Instructions
================================================================================
Steps to write about:
    - Installing dependencies
    - Launching bamazonCustomer.js
    - Video of selecting each item, and them being updated on the database

    - Launching bamazonManager.js
    - Video of selecting each option and them being updated on the database

Add screenshots of each step and also a screencastify video at the end
================================================================================

Make sure before loading either of these files, that you install all of the dependencies using **npm i** on node.
Once the dependencies are installed, run bamazonCustomer.js in the terminal.

You should be greeted with the following screen:

[Initial BamazonCustomer Load Screen](images/bcuststart.jpg)
[Load Screen Continued](images/bcuststart2.jpg)

As shown in the screenshot, the app then requests the user to input an ID number. This is ranging anywhere from 1 to the maximum amount of products available. In this case, it's 1 - 17. If the user tries to enter a letter or a number that isn't within this range, they'll be greeted with a message asking to select a valid number:

[Error message](images/bcustvalidation.jpg)

Once they've selected a valid ID number, chosen the stock amount (which also has it's own validation rules) the following screen shows:

[Item Purchased](images/bcustpurchase.jpg)

This screen shows the user what item they've selected and it's cost, as well as a total cost once the item has been purchased. 
Finally, the application ends with one last prompt offering the user to purchase another item, or exit the application. I thought it would be best to utilise this prompt, rather than relying on the user manually typing Ctrl+C, for aesthetic and real-world practicality purposes.


Here is a video of the app in action:

[Screencastify BamazonCustomer Video](https://drive.google.com/file/d/1VzKJ8Cy6wM6HCCcyXUKEAEXtzxtzEPkw/view)

