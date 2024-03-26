<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Price::all();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $price = Price::create([
            'gold' => $request->gold,
            'silver' => $request->silver,
            'diamond' => $request->diamond,
            'platinum' => $request->platinum,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Prices created successfully",
            'service' => $price
        ], 201);
    }


    /**
     * Update a specific column of the specified resource.
     */
    public function update(Request $request, Price $price)
    {
        // {{base_url}}/api/prices/1?_method=PATCH
        // Validate the request data (customize this based on your requirements)
        $request->validate([
            'gold' => 'numeric',
            'silver' => 'numeric',
            'diamond' => 'numeric',
            'platinum' => 'numeric',
        ]);

        // Check which column(s) to update
        if ($request->has('gold')) {
            $price->gold = $request->gold;
        }
        if ($request->has('silver')) {
            $price->silver = $request->silver;
        }
        if ($request->has('diamond')) {
            $price->diamond = $request->diamond;
        }
        if ($request->has('platinum')) {
            $price->platinum = $request->platinum;
        }

        // Save the updated model
        $price->save();

        return response()->json([
            'status' => 'success',
            'message' => "Prices updated successfully",
            'service' => $price
        ], 200);
    }
}
