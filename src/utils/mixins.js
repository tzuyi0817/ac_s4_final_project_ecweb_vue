import moment from 'moment'

export const starFilter = {
  filters: {
    star(rating) {
      const yellowNum = Math.floor(rating);
      const grayNum = Math.floor(5 - rating);
      const decimalNum = (rating - yellowNum).toFixed(1);

      const getStarts = (yellowNum, decimalNum, grayNum) => {
        const startInfosMap = [
          { color: "yellow", num: yellowNum },
          { color: null, num: decimalNum },
          { color: "gray", num: grayNum }
        ];

        const startsHtml = startInfosMap
          .map(item => {
            const { color, num } = item;
            const percentage = num * 100;
            if (!color && num > 0) {
              return `<span class="star star-percentage">
            <i class="fa fa-star fa-star-gray"></i>
            <i class="fa fa-star fa-star-yellow percent-star" style="width: ${percentage}%;"></i>
          </span>`;
            } else {
              return `<i class="fa fa-star fa-star-${color}"></i>`.repeat(num);
            }
          })
          .join("");

        return startsHtml;
      };
      return getStarts(yellowNum, decimalNum, grayNum);
    }
  }
}

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).format("YYYY-MM-DD HH:mm") : '-'
    }
  }
}

export const dateFilter = {
  filters: {
    date(datetime) {
      return datetime ? moment(datetime).format("YYYY-MM-DD") : '-'
    }
  }
}