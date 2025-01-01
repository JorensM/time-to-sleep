import { Component, ErrorInfo, PropsWithChildren } from 'react';

export default class ErrorBoundary extends Component<PropsWithChildren> {

    state: {
        error: null | Error
    } = {
        error: null
    }

    static getDerivedStateFromError(error: Error) {
        return {
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log('caught error');
    }

    render() {
        if(this.state.error) return (
            <div className='w-full h-full flex flex-col items-center justify-center'>
                An error has occured: {this.state.error.message}
            </div>
        )
        return this.props.children
    }
}