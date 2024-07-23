const Points = ({ x, y, img }) => {
    return (
        <div style={{
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`
        }}>
            <img src={img} alt="coin" width="30" height="30" />
        </div>
    );
};

export default Points;
