from flask import Blueprint, request, jsonify
from models.database import db, ChatSession, ChatMessage, Product
from utils.chatbot_engine import ChatbotEngine
import uuid
from datetime import datetime

chat_bp = Blueprint('chat', __name__)
chatbot = ChatbotEngine()

@chat_bp.route('/message', methods=['POST'])
def process_message():
    """Process chatbot message and return response"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        message = data['message'].strip()
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        if not message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Get or create chat session
        chat_session = ChatSession.query.filter_by(session_id=session_id).first()
        if not chat_session:
            chat_session = ChatSession(session_id=session_id)
            db.session.add(chat_session)
            db.session.commit()
        
        # Process message with chatbot engine
        response_data = chatbot.process_message(message)
        
        # Save message and response to database
        chat_message = ChatMessage(
            session_id=chat_session.id,
            message=message,
            response=response_data['response'],
            message_type=response_data.get('type', 'text')
        )
        db.session.add(chat_message)
        
        # Update session timestamp
        chat_session.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'response': response_data['response'],
            'type': response_data.get('type', 'text'),
            'products': response_data.get('products', []),
            'session_id': session_id,
            'message_id': chat_message.id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/history/<session_id>', methods=['GET'])
def get_chat_history(session_id):
    """Get chat history for a session"""
    try:
        chat_session = ChatSession.query.filter_by(session_id=session_id).first()
        
        if not chat_session:
            return jsonify({'error': 'Session not found'}), 404
        
        messages = ChatMessage.query.filter_by(session_id=chat_session.id)\
                                  .order_by(ChatMessage.timestamp.asc()).all()
        
        return jsonify({
            'session_id': session_id,
            'messages': [msg.to_dict() for msg in messages],
            'session_info': chat_session.to_dict()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/sessions', methods=['GET'])
def get_chat_sessions():
    """Get all chat sessions"""
    try:
        sessions = ChatSession.query.order_by(ChatSession.updated_at.desc()).all()
        return jsonify({
            'sessions': [session.to_dict() for session in sessions]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/reset/<session_id>', methods=['POST'])
def reset_chat_session(session_id):
    """Reset/clear a chat session"""
    try:
        chat_session = ChatSession.query.filter_by(session_id=session_id).first()
        
        if not chat_session:
            return jsonify({'error': 'Session not found'}), 404
        
        # Delete all messages in the session
        ChatMessage.query.filter_by(session_id=chat_session.id).delete()
        
        # Update session timestamp
        chat_session.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Chat session reset successfully',
            'session_id': session_id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
