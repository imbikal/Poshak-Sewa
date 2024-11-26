@extends('layouts.app')

@section('content')
<main>
    <div>
    <form method="POST" action="{{ route('forget.password.post') }}">
                        @csrf

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
    </div>
</main>
@endsection        
                             
