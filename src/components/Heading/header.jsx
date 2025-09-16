import PropTypes from 'prop-types';

function Heading({ title = 'About Us', subtitle = 'Crafting unforgettable journeys across Sri Lanka\'s wild and wonder.' }) {
    return (
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
        </div>
    )
}

Heading.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default Heading;