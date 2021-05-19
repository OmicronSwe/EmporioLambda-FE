import React from "react";
import { Button, InputGroup, DropdownButton, FormControl, Dropdown } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

class SearchBar extends React.Component<{
  categories: string[];
  category: string;
  name: string;
  maxPrice: number;
  minPrice: number;
  changeCategory;
  onSearch;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories, category, changeCategory, onSearch, minPrice, maxPrice, name } = this.props;
    return (
      <>
        <InputGroup id="searchBar">
          <DropdownButton
            as={InputGroup.Append}
            variant="info"
            title={category}
            id="category"
            name="category"
          >
            <Dropdown.Item
              key="All categories"
              href="#"
              onClick={() => {
                changeCategory("All categories");
              }}
            >
              All categories
            </Dropdown.Item>

            {categories &&
              categories.map((item) => (
                <Dropdown.Item
                  key={item}
                  href="#"
                  onClick={() => {
                    changeCategory(item);
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
            defaultValue={name}
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
            defaultValue={minPrice}
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
            defaultValue={maxPrice}
          />

          <Button onClick={() => onSearch()} id="searchButton">
            <BsSearch />
          </Button>
        </InputGroup>
      </>
    );
  }
}

export default SearchBar;
