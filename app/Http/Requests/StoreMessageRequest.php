<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'message' => 'nullable|string',
            'group_id' => 'required_without:receiver_id|nullable|exists:groups,id',
            'receiver_id' => 'required_without:group_id|nullable|exists:users,id',
            'attachment' => 'nullable|array|max:10',
            'attachment.*' => 'file|max:1024000',
        ];
    }
}
