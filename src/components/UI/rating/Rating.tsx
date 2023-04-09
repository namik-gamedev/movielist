import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import styles from './Rating.module.css';

interface RatingProps {
   value: number;
   className?: string;
}

const Rating: FC<RatingProps> = ({ value, className }) => {
   const [background, setBackground] = useState<string>();
   useEffect(() => {
      if (value >= 7) {
         setBackground('#21d13b');
      } else if (value >= 5.5) {
         setBackground('#edc13f');
      } else if (value >= 3.5) {
         setBackground('#c94f32');
      } else {
         setBackground('#94969d');
      }
   }, []);

   return (
      <div style={{ background }} className={classNames(styles.rating, className)}>
         {value.toPrecision(2)}
      </div>
   );
};

export default Rating;
