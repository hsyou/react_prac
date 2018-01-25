import React, { Component } from 'react';
import './Video.css';
import { Link } from 'react-router'
import { Container, Row, Col,Button,Input,InputGroup,InputGroupAddon, Card,CardHeader } from 'reactstrap';

let loadYT;

class Video extends Component {

    constructor(){
        super();
        
        this._clickLikeButton=this._clickLikeButton.bind(this);
        this._clickDislikeButton=this._clickDislikeButton.bind(this);
        this._dragdiv=this._dragdiv.bind(this);

        this.state={
            time:0
        };

        console.log(this.state.commnets)
    }

    componentDidMount(){    
        //fetch data
        this._getVideo();
        this._initVideo();
        // this._map(this.state.comments);
    }

    _beforeLeaving=()=>{

    }
    
    _getVideo=()=>{
        //const video=await this._callApi();
        
        //VIDEO info
        this.setState({
            title:"ReactJS Fundamentals",hit:7400,content:"Nomad Academy",name:"hakseung",date:"2018-01-01",img:"data:image/png;base64,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",
            uimg:"https://www.w3schools.com/howto/img_avatar.png",
            like:437,dislike:142        
        })
        
        this.setState({YTid:'sM2p1EqTlw4'});

        //COMMENTS info
        this.setState({comments:[
            {nickname:"EFD",vdate:"2009-12-01",comment:"AUIFJWEIF",playtime:52,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"SQW",vdate:"2012-11-21",comment:"EGGIWEFEW",playtime:82,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"ZCI",vdate:"2013-12-31",comment:"XBCVBBERB",playtime:56,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"OLG",vdate:"2014-05-11",comment:"TCVBESXBW",playtime:152,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"FWO",vdate:"2015-02-08",comment:"KYTYJCNVD",playtime:32,uimg:"https://www.w3schools.com/howto/img_avatar.png"}
        ]
        });


        this.setState(prevState=>({comments:[...prevState.comments,
            {nickname:"ABSADFX",vdate:"2016-02-11",comment:"VIOAUSHEV",playtime:43,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"SRH",vdate:"2017-11-28",comment:"CXNOJOWEG",playtime:102,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"ABX",vdate:"2016-02-11",comment:"VIOAUSHEV",playtime:592,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"SRH",vdate:"2017-11-28",comment:"CXNOJOWEG",playtime:482,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"ABAWEFX",vdate:"2016-02-11",comment:"VIOAUSHEV",playtime:104,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"SRH",vdate:"2017-11-28",comment:"CXNOJOWEG",playtime:488,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"XCVBABX",vdate:"2016-02-11",comment:"VIOAUSHEV",playtime:522,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"SRH",vdate:"2017-11-28",comment:"CXNOJOWEG",playtime:123,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"ABX",vdate:"2016-02-11",comment:"VIOAUSHEV",playtime:211,uimg:"https://www.w3schools.com/howto/img_avatar.png"},
            {nickname:"SRH",vdate:"2017-11-28",comment:"CXNOJOWEG",playtime:82,uimg:"https://www.w3schools.com/howto/img_avatar.png"}
       
        ]
        }));

        // this.setState(prevState=>({comments:[...prevState.comments,
        //     {nickname:"ABX",vdate:"2016-02-11",comment:"VIOAUSHEV"},
        //     {nickname:"SRH",vdate:"2017-11-28",comment:"CXNOJOWEG"}
        // ]
        // }));

        
    }
   
    //[START : init]
    _callApi=()=>{
        //call api
        
    }

    _initVideo=()=>{
    
        if (!loadYT) {
            loadYT = new Promise((resolve) => {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
            window.onYouTubeIframeAPIReady = () => resolve(window.YT)
            })
        } 
        loadYT.then((YT) => {
            this.player = new YT.Player(this.youtubePlayerAnchor, {
                videoId: this.state.YTid,
                events: {
                    onStateChange: this.onPlayerStateChange
                    
                }
            })
        })
    }
    //[END : init]

    //[START : button listener]
    _clickLikeButton=()=>{
        console.log("Like it!");
    };
    _clickDislikeButton=()=>{
        console.log("Dislike it!");
    };
    //[END : button listener]


    //[START : video state]
    _videoEnded=()=>{
        clearInterval();
        console.log("video ended"+this.state.time);
    }
    _videoPlaying=()=>{
        setInterval(() => {
            this.setState({time:this.player.getCurrentTime()})
        }, 100);
    }
    _videoPaused=()=>{
        clearInterval();
        console.log("video paused"+this.state.time);
    }
    _videoBuffering=()=>{
        
        console.log("video buffering"+this.state.time);
    }
    _videoCued=()=>{

        console.log("video cued"+this.state.time);
    }
    onPlayerStateChange = (e) => {
        console.log("state : "+this.player.getPlayerState())    
        switch(this.player.getPlayerState()){
            case -1:
            break;
            case 0:
                this._videoEnded();
            break;
            case 1:
                this._videoPlaying();
            break;
            case 2:
                this._videoPaused();
            break;
            case 3:
                this._videoBuffering();
            break;
            case 5:
                this._videoCued();
            break;
            default:
            break;
        }
    }
    //[END : video state]

  //[START : Draggable]

  _dragdiv(e){
    console.log("wowowo"+e.screenX+","+e.screenY);
    document.getElementById('dropbox').style.top=e.screenY+"px";
    document.getElementById('dropbox').style.left=e.screenX+"px";

    console.log( document.getElementById('dropbox').style.top+","+ document.getElementById('dropbox').style.left);
    
}



//[END : Draggable]

    //[START : Rendering ]
    _renderComments=()=>{
        const renderer=this.state.comments.map((comment)=>{
            return <Video_comment nickname={comment.nickname} vdate={comment.vdate} comment={comment.comment} playtime={comment.playtime} uimg={comment.uimg}/>
        })
        return renderer;
    }
  
    render() {
        
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return (
            <Container>
                 {this.state.time}
                <div className="video_frame">
                    <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
                    
                    {/* <div draggable="true" className="box" id="dropbox" onDragEnd={(event)=>this._dragdiv(event)}>
                       draggable
                    </div> */}
                    
                </div>
               
                <Card className="cards">
                    <Row>
                        <Col> <h3>{this.state.title}</h3> </Col>
                    </Row>
                    <Row>
                        <Col md="6"> 
                            <small className="video_hit">조회수 {this.state.hit} 회</small>
                        </Col>
                        <Col md="3">
                            <Button outline color="primary" onClick={()=>this._clickLikeButton()}></Button>{' '}<span>{this.state.like}</span>
                        </Col>                    
                        <Col md="3">
                            <Button outline color="primary" onClick={()=>this._clickDislikeButton()}></Button>{' '}<span>{this.state.dislike}</span>
                        </Col>
                    </Row>
                </Card>
                <Card className="cards">
                    <Video_content img={this.state.img} name={this.state.name} date={this.state.date} content={this.state.content}/>
                </Card>
                <Card className="cards">
                        <div className="video_write">
                            <Row>
                                <Col md="2">
                                    <User_img uimg={this.state.uimg}/>
                                </Col>
                                <Col md="10">
                                    <InputGroup>
                                        <Input />
                                        <InputGroupAddon addonType="append">
                                            <Button color="secondary"></Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </div>
                    <hr/>
                    <div>
                        {this.state.comments?this._renderComments():'loading'}
                    </div>
                </Card>
            </Container>
            
        );
    };
    //[END : Rendering ]
}



function Video_content({img,name,date,content}){
    return(
        <div className="video_content">
            <Row>
                <Col md="2">
                    <Uploader_img img={img}/>
                </Col>
                <Col md="8">
                    <Row>
                        <h3>{name}</h3>
                    </Row>
                    <Row>
                        <p>{content}</p>
                    </Row>
                </Col>
                <Col md="2">
                    <small className="text-muted">{date}</small>
                </Col>
            </Row>
        </div>
    );
}

function Uploader_img({img}){
    return(
        <img className="uploader_img" src={img}/>
    )
}
function User_img({uimg}){
    return(
        <img className="user_img" src={uimg}/>
    )
}

function SecondToTime({sec}){
    var hours = Math.floor(sec / (60 * 60));

    var divisor_for_minutes = sec % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var result = (hours < 10 ? "0" + hours : hours);
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds  < 10 ? "0" + seconds : seconds);

    return (
        <span>{result}</span>
    )
}



function Video_comment({uimg,nickname,vdate,comment,playtime}){

    this._wo=this._wo.bind(this);

    return(
        <div className="video_comment">
            <Row>
                <Col md="2">
                    <User_img uimg={uimg}/>
                </Col>
                <Col md="10">
                    <Row>
                        <Col>
                            <h5>{nickname}</h5>
                        </Col>
                        <Col>
                            <small className="text-muted"><a href="#"><SecondToTime sec={playtime}/></a></small>
                        </Col>
                        <Col>
                             <small className="text-muted">{vdate}</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{comment}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <a href="#" className="comments_button">댓글</a>  
                        </Col>
                        <Col md="3">
                            <Button outline color="primary" onClick={()=>this._wo()}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></Button>{' '}<span></span>
                        </Col>
                        <Col md="3">
                            <Button outline color="primary" onClick={()=>this._clickDislikeButton()}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></Button>{' '}<span></span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};


export default Video;
