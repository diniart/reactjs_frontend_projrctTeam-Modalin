const FilterTransc = (array, status) => {
    if (array !== undefined) {
        let proses = array.filter((arr) => {
            if (status.indexOf(arr.status, 0) !== -1) {
                return true;
            }
        });
        return proses;
    }
};

export default FilterTransc