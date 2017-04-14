require('normalize.css');
import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';

const AccordionTest = ({ songs }) => (

      <Accordion allowMultiple={true} activeItems={[1]}>
        {[1, 2, 3, 4].map((item) => {
          return (
            <AccordionItem title={`This is How We do It ${ item } by Montell Jordan`} slug={item} key={item}>
              <div>
                {`Item ${ item } content`}
                {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
              </div>
            </AccordionItem> 

          );
        })}
      </Accordion>
);

  export default AccordionTest;
