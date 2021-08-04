import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

const getContainerStyle = (draggableStyle, stateWidth) => ({
  ...draggableStyle,
  width: stateWidth,
});

class TrackObject extends Component {
  constructor(props) {
    super(props);
    const { id, file, name, type, i, index } = props;
    this.id = id;
    this.file = file;
    this.name = name;
    this.type = type;
    this.i = i;
    this.index = index;

    this.state = {
      width: "100px",
    };
  }

  componentDidMount() {
    let au = new Audio(this.file);
    au.onloadedmetadata = () => {
      if (au.duration <= 3) {
        this.setState({
          width: 80,
        });
      } else if (au.duration >= 100) {
        this.setState({
          width: 2 * au.duration,
        });
      } else {
        this.setState({
          width: 5 * au.duration,
        });
      }
    };
  }

  render() {
    return (
      <Draggable
        draggableId={"trackobjectdrag-" + this.i + "-" + this.id}
        index={this.index}
        key={"trackobject-" + this.id}
      >
        {(provided) => (
          <div
            className="track-object"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getContainerStyle(
              provided.draggableProps.style,
              this.state.width
            )}
          >
            <div className="type-display">{this.type}</div>
            <div className="track-data">
              <audio id={"music-" + this.id} src={this.file}></audio>
              {this.name}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default TrackObject;
