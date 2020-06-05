import React from 'react';
import { Remarkable } from 'remarkable';    
import { BoldMark, ItalicMark, FormatToolBar } from './index';
import Icon from 'react-icons-kit';
import { bold, italic } from 'react-icons-kit/feather';


export default class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
            value: 'Type some *markdown* there!'
        };
    }
    onKeyDown = (e, editor) => {
        this.editor = editor;

        if (!e.ctrlKey) { return }
        e.preventDefault();

        switch (e.key) {
            case 'b':
                editor.toggleMark('bold');
                return true

            case 'i':
                editor.toggleMark('italic');
                return true;

            default:
                return true
        }
    }
    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
            default:
                return props;
        }
    }
    onMarkClick = (e, type) => {
        e.preventDefault();

        if (this.editor) {
            this.editor.toggleMark(type);
        }
    }


    handleChange(e) {
        console.log(e.target.value);
        this.setState({value: e.target.value});
    }
    handleSubmit(e){
        console.log(e.target.value);
        this.setState({ 
            value: e.target.value
        });
    }

    getRawMarkup() {
        const md = new Remarkable();
        return {__html: md.render(this.state.value)};
    }

    render() {
        return (
            <div className="container">
                <div className="input">
                <FormatToolBar>
                    <button 
                        className="tooltip-icon-button"
                        onClick={(e) => this.onMarkClick(e, 'bold')}
                    >
                        <Icon icon={bold} />
                    </button>
                    <button 
                        className="tooltip-icon-button"
                        onClick={(e) => this.onMarkClick(e, 'italic')}
                    >
                        <Icon icon={italic} />
                    </button>
                </FormatToolBar>
                    <h3>Input</h3>
                    <form >
                    <input type="text" onChange={this.handleChange} onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}/><br/><br/>
                    <input type="submit" value="submit"/>
                    </form>
                </div>
                <div className="output">
                    <h3>Markdown</h3>
                <div 
                    dangerouslySetInnerHTML={this.getRawMarkup()}
                    className="output-text"
                >
                </div>
                </div>                
            </div>
        )
    }
}
