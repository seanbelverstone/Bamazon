#Bamazon

##Overview
A shopping app for customers and managers alike! Much like the famous shopping website with the same name, this allows a user to view current stock and purchase items. It also allows a manager to enter the application to view the stock, view low stock, add more inventory and even add a new item.

Having the option to buy stock as a customer, but also add more as a manager has many useful benefits, the main one being the fact that you can replenish stock that has been otherwise used up. If there was no manager page, eventually no-one would be able to buy anything.


##Instructions and Walkthrough

###Bamazon Customer View
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

###Bamazon Manager View

Remember again, once using this app - install the dependencies with **npm i** in order for the the application to work.
Once this has all been done, you'll see the following screen:

[Bamazon Manager Initial List Selection](images/bmanagerstart.jpg)

I decided to begin with a list instead of showing all of the items straight away, as from a manager's perspective, I can imagine they'd want more decision making straight from the beginning. As you can see, there's also a *Quit* option, which I thought would be a great addition.
We'll start with *View Products for Sale*.

[View Products for Sale Option](images/bmanagerproducts.jpg)

As shown, it is very similar to the customer view. However, at the bottom there is an option to return to the main menu:

[Main Menu Prompt](images/bmanagercontinue.jpg)

When back at the main menu, you're greeted with the same list of options as before. This time we'll select *View Low Inventory*. This shows a list of all products with a stock level of 5 or less. I'll show both results, the first one being an empty list as the manager is all stocked up, and the second being a single item with low stock.

[All Stocked Up](images/bmanagernoitemslow.jpg)

[Item With Low Inventory](images/bmanagerlowstock.jpg)

If the manager is met with the second screen, we can add more inventory to this item! After going back to the main menu, we select the *Add to Inventory* option:

[Adding Stock](images/bmanageraddstock.jpg)

This also has validation within the prompt, preventing user errors.

Finally, the last option is *Add New Product*. Also featuring heavy validation rules, this allows a user to input an item, the department it belongs in, it's price and also the initial starting stock. Once the item is added, it displays the entire table again. I decided to do it this way, rather than just show the final item, as the last inputted value always appends to the bottom anyway. Plus this gives the manager an extra chance to look over the entire stock. Here's a screenshot of that in action:

[Adding a New Item](images/bmanageradditem.jpg)

[Table With New Item at Bottom](images/bmanagerfinaldisplay.jpg)

Here's a video of the Manager application in action:

[Screencastify BamazonManager Video](https://drive.google.com/file/d/1-rkrHQgvEdVJrAQGnjA9raD2vHU61uVV/view)


And that's it! I had a great time with this project and hope you enjoy it too.