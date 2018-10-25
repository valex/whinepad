import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: props.defaultValue,
            tmpRating: props.defaultValue,
        };

        // This binding is necessary to make `this` work in the callback
        this._onClick = this._onClick.bind(this);
        this._onMouseOver = this._onMouseOver.bind(this);
        this.reset = this.reset.bind(this);
    }

    getValue() {
        return this.state.rating;
    }

    setTemp(rating) {
        this.setState({tmpRating: rating});
    }

    setRating(rating) {
        this.setState({
            tmpRating: rating,
            rating: rating,
        });
    }

    reset() {
        this.setTemp(this.state.rating);
    }

    componentWillReceiveProps(nextProps) {
        this.setRating(nextProps.defaultValue);
    }

    _onClick(e, i){

        !this.props.readonly && this.setRating(i);
    }

    _onMouseOver(e, i){
        !this.props.readonly && this.setTemp(i);
    }

    render() {
        const stars = [];
        for (let i = 1; i <= this.props.max; i++) {
            stars.push(
                <span
                    className={i <= this.state.tmpRating ? 'RatingOn' : null}
                    key={i}
                    onClick={(e) => { this._onClick(e, i) }}
                    onMouseOver={(e) => { this._onMouseOver(e, i) }}
                >
          &#9734;
        </span>);
        }
        return (
            <div
                className={classNames({
                    'Rating': true,
                    'RatingReadonly': this.props.readonly,
                })}
                onMouseOut={this.reset}
            >
                {stars}
                {this.props.readonly || !this.props.id
                    ? null
                    : <input
                        type="hidden"
                        id={this.props.id}
                        value={this.state.rating} />
                }
            </div>
        );
    }
}

Rating.propTypes = {
    defaultValue: PropTypes.number,
    readonly: PropTypes.bool,
    max: PropTypes.number,
};

Rating.defaultProps = {
    defaultValue: 0,
    max: 5,
};

export default Rating
