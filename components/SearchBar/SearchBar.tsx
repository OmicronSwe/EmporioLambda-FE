import React from "react";
import Router from "next/router";
import { Button, InputGroup, DropdownButton, FormControl, Dropdown } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

class SearchBar extends React.Component<
  { categories: string[]; category: string },
  { category: string }
> {
  constructor(props) {
    super(props);

    const { category } = this.props;

    this.state = {
      category,
    };
  }

  changeCategory(event) {
    // Intended to run on the change of every form element
    this.setState({
      category: event.target.textContent,
    });
  }

  render() {
    const { categories } = this.props;
    const { category } = this.state;
    return (
      <>
        <InputGroup>
          <DropdownButton
            as={InputGroup.Append}
            variant="info"
            title={category}
            id="category"
            name="category"
          >
            <Dropdown.Item
              href="#"
              onClick={(e) => {
                this.changeCategory(e);
              }}
            >
              All categories
            </Dropdown.Item>

            {categories.map((item) => (
              <Dropdown.Item
                href="#"
                onClick={(e) => {
                  this.changeCategory(e);
                }}
              >
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <FormControl
            className="searchProductName"
            placeholder="Search your product"
            aria-label="search bar for product"
            aria-describedby="search-bar-for-product"
            id="productValue"
            name="productValue"
          />

          <InputGroup.Prepend>
            <InputGroup.Text>€</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="minPriceValue"
            name="minPriceValue"
            aria-label="Amount (to the nearest dollar)"
            type="number"
            placeholder="Min price"
          />

          <InputGroup.Prepend>
            <InputGroup.Text>€</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="maxPriceValue"
            name="maxPriceValue"
            aria-label="Amount (to the nearest dollar)"
            type="number"
            placeholder="Max price"
          />

          <Button
            onClick={() => {
              let searchInput: string = "";

              const productValue: string = (document.getElementById(
                "productValue"
              ) as HTMLInputElement).value;
              const minPriceValue: string = (document.getElementById(
                "minPriceValue"
              ) as HTMLInputElement).value;
              const maxPriceValue: string = (document.getElementById(
                "maxPriceValue"
              ) as HTMLInputElement).value;

              if (productValue) {
                searchInput += `name=${productValue}&`;
              }

              if (minPriceValue) {
                searchInput += `minprice=${minPriceValue}&`;
              }

              if (maxPriceValue) {
                searchInput += `maxprice=${maxPriceValue}&`;
              }

              if (category && category !== "All categories") {
                searchInput += `category=${category}&`;
              }

              searchInput = searchInput.slice(0, -1); // remove last &

              Router.push(`/product/search/${encodeURI(searchInput)}`);
            }}
          >
            <BsSearch />
          </Button>
        </InputGroup>
      </>
    );
  }
}

export default SearchBar;
