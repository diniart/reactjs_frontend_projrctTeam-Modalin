
const FilterOrder = (array, status) => {
    if (array !== undefined) {
        let proses = array.filter((arr) => {
            if (status.indexOf(arr.Status, 0) !== -1) {
                return true;
            }
        });
        return proses;
    }
};

export default FilterOrder