import React, { Component } from 'react'

const RESET_VALUES = {id: '', category: '', price: '', name: ''}

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            product:
              (this.props.product && this.props.product.product) ||
              Object.assign({}, RESET_VALUES),
            errors: {},
        };
    }
        
    handleChange(e) {
        const target = e.target
        const name = target.name
        const value = name === "instock" ? target.value === "true" : target.value;
    
        this.setState((prevState) => {
            prevState.product[name] = value
            return { product: prevState.product }
        })
    }

    handleSave(e) {
        e.preventDefault()
        this.props.onSave(this.state.product);
        // reset the form values to blank after submitting
        this.handleReset();
        // prevent the form submit event from triggering an HTTP Post
       
    }

    handleReset() {
        this.setState({
          product: Object.assign({}, RESET_VALUES),
        });
    }

    render () {
        return (
            <form onSubmit={this.handleSave}>
                <h4>Add a new product</h4>
                <p>
                    <label>Name <br /> 
                    <input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.product.name} /></label>
                </p>
                <p>
                    <label>Category <br /> 
                    <input type="text" className="form-control" name="category" onChange={this.handleChange} value={this.state.product.category} /></label>
                </p>
                <p>
                    <label>Price <br /> 
                    <input type="text" className="form-control" name="price" onChange={this.handleChange} value={this.state.product.price} /></label>
                </p>
                <p>Is the product in stock? </p>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="instock" id="yes" onChange={this.handleChange} value="true" checked={this.state.product.instock === true}/>
                    <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="instock" id="no" onChange={this.handleChange} value="false" checked={this.state.product.instock === false}/>
                    <label className="form-check-label">No</label>
                </div>
                <br />
                <input type="submit" className="btn btn-info" value="Save"></input>
                <input type="reset" onClick={this.handleReset} className="btn btn-danger" value="Clear"></input>
            </form>
        )
    }
}

export default ProductForm