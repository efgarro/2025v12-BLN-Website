import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export class ImageClusterGrid extends React.Component {
  render() {
    return (
      // <div className="core_wrapper">
      <ResponsiveGridLayout
        className="layout"
        layouts={this.props.layouts}
        rowHeight={this.props.rowHeight}
        breakpoints={{ lg: 992, md: 768, sm: 576, xs: 480, xxs: 0 }}
        /* [ 576 <= 4 cols < 778 ], [  768 <= 6 cols < 992 ], [ 992 <= 12 cols ] */
        cols={{ lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 }}
        isResizable={false}
        isDraggable={false}
        margin={[15, 15]}
        useCSSTransforms={false}
        compactType={"vertical"}
      >
        {console.log(this.props.breakpoints)}
        {this.props.dataPics.map((photo) => {
          return (
            <div key={photo.id} className={"card--img"}>
              <img src={photo.url} alt={"Pic"} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
      // </div>
    );
  }
}
